import type { Metadata } from "next";
import Image from "next/image";
import { Globe2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { avatarUrl } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Lukmoore's mission to power premium multi-vendor commerce across Africa and beyond.",
};

const values = [
  { icon: ShieldCheck, title: "Trust first", description: "Every vendor is verified, every order is protected." },
  { icon: Sparkles, title: "Premium experience", description: "We obsess over design details most marketplaces skip." },
  { icon: HeartHandshake, title: "Fair for vendors", description: "Transparent, low commissions and fast payouts." },
  { icon: Globe2, title: "Built for Africa, ready for the world", description: "Local payment rails, global standards." },
];

const team = [
  { name: "Ifeoma Adeyemi", role: "Co-Founder & CEO" },
  { name: "Marcus Otieno", role: "Co-Founder & CTO" },
  { name: "Sandra Nkosi", role: "Head of Vendor Success" },
  { name: "Daniel Owusu", role: "Head of Design" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          Building the future of <span className="text-gradient-brand">premium commerce</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Lukmoore was founded in 2020 with a simple belief: shopping online should feel as good
          as the products you're buying. Today we connect over 4,200 verified vendors with more
          than 1.2 million shoppers across Africa and beyond.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border bg-card p-6">
              <div className="bg-gradient-brand mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                <value.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/40 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          <Stat label="Active vendors" value="4,200+" />
          <Stat label="Products listed" value="65,000+" />
          <Stat label="Happy customers" value="1.2M+" />
          <Stat label="Countries served" value="12" />
        </div>
      </section>

      <section id="careers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Leadership" title="Meet the team" align="center" />
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted">
                <Image src={avatarUrl(member.name)} alt={member.name} fill />
              </div>
              <p className="mt-3 text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
          We're always looking for talented people to join our mission. Reach out at{" "}
          <a href="mailto:careers@lukmoore.com" className="text-brand-red underline">
            careers@lukmoore.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-heading text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
