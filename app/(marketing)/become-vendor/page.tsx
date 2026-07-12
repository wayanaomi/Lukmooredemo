import type { Metadata } from "next";
import { BadgeCheck, LineChart, PackageCheck, Wallet } from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { VendorApplicationForm } from "@/components/marketplace/vendor-application-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Become a Vendor",
  description: "Start selling on Lukmoore and reach over 1.2 million active shoppers.",
};

const benefits = [
  { icon: Wallet, title: "Low commission", description: "Starting at just 7% per sale, with transparent payouts." },
  { icon: PackageCheck, title: "Fast onboarding", description: "Get verified and start listing products in under 48 hours." },
  { icon: LineChart, title: "Powerful analytics", description: "Track sales, inventory, and customer insights in real time." },
  { icon: BadgeCheck, title: "Trust & visibility", description: "Verified badges and featured placements boost conversions." },
];

const faqs = [
  {
    q: "How much does it cost to open a store?",
    a: "Creating a store on Lukmoore is completely free. We only charge a commission (7-15% depending on category) once you make a sale.",
  },
  {
    q: "How long does verification take?",
    a: "Most applications are reviewed within 48 hours. You may be asked to submit KYC documents to complete verification.",
  },
  {
    q: "How do I get paid?",
    a: "Withdrawals can be requested to your bank account or mobile money wallet from your Vendor Dashboard once your balance clears.",
  },
  {
    q: "Can I sell in multiple categories?",
    a: "Yes — once approved, you can list products across any category that fits your store.",
  },
];

export default function BecomeVendorPage() {
  return (
    <div>
      <section className="bg-gradient-brand-radial relative overflow-hidden py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold sm:text-5xl">Start selling on Lukmoore</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Join over 4,200 vendors reaching 1.2 million+ active shoppers across Africa and
            beyond. Setup takes less than 10 minutes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border bg-card p-6">
              <div className="bg-gradient-brand mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                <benefit.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Apply now" title="Vendor Application" description="Tell us about your business and we'll be in touch within 48 hours." />
        <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
          <VendorApplicationForm />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
