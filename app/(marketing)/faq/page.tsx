import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketplace/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shopping, selling, and shipping on Lukmoore.",
};

const faqGroups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Most orders arrive within 3-5 business days depending on your location and the vendor's shipping policy." },
      { q: "Can I track my order?", a: "Yes — use the Track Order page with your order number, or check Dashboard > Orders while logged in." },
      { q: "What if my order doesn't arrive?", a: "You're covered by Lukmoore Buyer Protection. Open a support ticket and we'll investigate and refund if needed." },
    ],
  },
  {
    title: "Payments",
    items: [
      { q: "What payment methods are supported?", a: "We support Paystack, Flutterwave, and Stripe — covering cards, bank transfers, mobile money, and USSD." },
      { q: "Is my payment information secure?", a: "Yes. We never store card details — all transactions are processed by PCI-compliant payment partners." },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "Most items can be returned within 7 days of delivery if unused and in original packaging. Policies vary slightly by vendor." },
      { q: "How do refunds work?", a: "Once a return is approved, refunds are issued to your original payment method within 5-7 business days." },
    ],
  },
  {
    title: "Selling on Lukmoore",
    items: [
      { q: "How do I become a vendor?", a: "Apply via the Become a Vendor page. Approval typically takes under 48 hours." },
      { q: "What commission does Lukmoore charge?", a: "Commission ranges from 7-15% depending on category, with no listing fees." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Support" title="Frequently Asked Questions" align="center" />
      <div className="mt-10 flex flex-col gap-10">
        {faqGroups.map((group) => (
          <div key={group.title}>
            <h2 className="font-heading text-lg font-bold">{group.title}</h2>
            <Accordion type="single" collapsible className="mt-3">
              {group.items.map((item, index) => (
                <AccordionItem key={index} value={`${group.title}-${index}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
