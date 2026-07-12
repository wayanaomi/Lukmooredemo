import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Headset,
  Package,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
  User,
} from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers about orders, returns, payments, and vendor accounts on Lukmoore.",
};

const topics = [
  {
    icon: Package,
    title: "Orders & Tracking",
    description: "Order status, delivery estimates, and tracking your package.",
    href: "/track-order",
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    description: "How to request a return and when to expect your refund.",
    href: "/faq#Returns%20%26%20Refunds",
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Accepted payment methods, failed transactions, and receipts.",
    href: "/faq#Payments",
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Delivery times, shipping fees, and international orders.",
    href: "/faq#Orders%20%26%20Shipping",
  },
  {
    icon: Store,
    title: "Selling on Lukmoore",
    description: "Vendor onboarding, payouts, and store management.",
    href: "/become-vendor",
  },
  {
    icon: User,
    title: "Account & Security",
    description: "Manage your profile, password, and privacy settings.",
    href: "/dashboard/settings",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    description: "How we keep your purchases safe and secure.",
    href: "/faq",
  },
  {
    icon: Headset,
    title: "Contact Support",
    description: "Reach our support team for anything else.",
    href: "/contact",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="bg-gradient-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white sm:py-16">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">How can we help?</h1>
        <p className="mx-auto mt-2 max-w-xl text-white/85">
          Search our help articles or browse topics below.
        </p>
        <div className="mx-auto mt-6 max-w-lg">
          <Input
            placeholder="Search for help articles..."
            className="h-12 border-0 bg-white text-foreground shadow-brand-lg"
          />
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading title="Browse by topic" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-colors hover:border-brand-red/40"
            >
              <div className="bg-gradient-brand flex h-10 w-10 items-center justify-center rounded-xl">
                <topic.icon className="h-4.5 w-4.5 text-white" />
              </div>
              <h3 className="font-semibold group-hover:text-brand-red">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
