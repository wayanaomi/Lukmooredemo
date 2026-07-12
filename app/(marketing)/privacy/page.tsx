import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketplace/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lukmoore collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, shipping address, and payment details when you create an account, place an order, or apply to become a vendor. We also automatically collect certain information about your device and usage of our platform, including IP address, browser type, and pages visited.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to process orders and payments, communicate with you about your account and orders, personalize your shopping experience, prevent fraud, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Sharing Your Information",
    body: "We share your information with vendors to fulfill your orders, with payment processors (Paystack, Flutterwave, Stripe) to process transactions, and with service providers who help us operate our platform. We may also disclose information if required by law.",
  },
  {
    title: "4. Data Security",
    body: "We implement industry-standard security measures, including encryption in transit and at rest, to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies & Tracking",
    body: "We use cookies and similar tracking technologies to remember your preferences, keep you signed in, and understand how you use our platform. You can control cookies through your browser settings.",
  },
  {
    title: "6. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, delete, or export your personal data. You can manage most of your information directly from your account settings, or contact us to make a request.",
  },
  {
    title: "7. Children's Privacy",
    body: "Lukmoore is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of material changes by posting a notice on our platform or sending you an email.",
  },
  {
    title: "9. Contact Us",
    body: "If you have questions about this Privacy Policy, please contact us at privacy@lukmoore.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" description="Last updated: January 1, 2025" />
      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-lg font-bold">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
