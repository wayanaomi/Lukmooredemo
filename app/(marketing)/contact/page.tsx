import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { ContactForm } from "@/components/marketplace/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Lukmoore team for support, partnerships, or press inquiries.",
};

const cards = [
  { icon: Mail, label: "Email", value: siteConfig.contact.supportEmail, href: `mailto:${siteConfig.contact.supportEmail}` },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Office", value: siteConfig.contact.address },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Get in touch" title="We'd love to hear from you" align="center" />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <div key={card.label} className="flex items-start gap-4 rounded-2xl border bg-card p-5">
              <div className="bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <card.icon className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="text-sm font-semibold hover:text-brand-red">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold">{card.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
