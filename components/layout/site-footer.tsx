"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerNav, siteConfig } from "@/config/site";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! Watch your inbox for exclusive drops.");
    setEmail("");
  }

  return (
    <footer className="relative border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-panel mb-14 flex flex-col items-center justify-between gap-6 rounded-2xl p-8 shadow-brand-sm sm:flex-row">
          <div>
            <h3 className="text-xl font-bold">Get first access to drops & flash sales</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Join our list — no spam, just Lukmoore&apos;s best offers.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
            />
            <Button type="submit" className="shrink-0 shadow-brand-sm">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo/lukmoore-mark.svg" alt="Lukmoore" width={36} height={36} />
              <span className="text-gradient-brand text-lg font-extrabold">Lukmoore</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {siteConfig.contact.supportEmail}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {siteConfig.contact.address}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <a href={siteConfig.links.facebook} aria-label="Facebook" className="rounded-full border p-2 transition-colors hover:bg-accent">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.instagram} aria-label="Instagram" className="rounded-full border p-2 transition-colors hover:bg-accent">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.twitter} aria-label="Twitter" className="rounded-full border p-2 transition-colors hover:bg-accent">
                <FaTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={footerNav.shop} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Support" links={footerNav.support} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lukmoore Inc. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>Secure payments via</span>
            <span className="font-semibold text-foreground">Paystack</span>
            <span className="font-semibold text-foreground">Flutterwave</span>
            <span className="font-semibold text-foreground">Stripe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { title: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
