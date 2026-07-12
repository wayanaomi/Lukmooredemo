import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketplace/section-heading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of Lukmoore.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using Lukmoore, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our platform.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old to create an account and make purchases on Lukmoore. By creating an account, you represent that you meet this requirement.",
  },
  {
    title: "3. Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Vendor Obligations",
    body: "Vendors must provide accurate product listings, honor stated shipping timelines, and comply with all applicable laws. Lukmoore reserves the right to suspend or terminate vendor accounts that violate these terms or receive repeated customer complaints.",
  },
  {
    title: "5. Orders & Payments",
    body: "All prices are listed in the applicable currency and are subject to change. Payments are processed securely through our third-party payment partners. Orders may be cancelled or refunded in accordance with our Returns Policy.",
  },
  {
    title: "6. Prohibited Conduct",
    body: "You may not use Lukmoore to sell counterfeit goods, engage in fraudulent activity, harass other users, or violate any applicable law. Violations may result in immediate account termination.",
  },
  {
    title: "7. Intellectual Property",
    body: "All content on Lukmoore, including our logo, design, and software, is owned by Lukmoore or its licensors and may not be used without permission.",
  },
  {
    title: "8. Limitation of Liability",
    body: "Lukmoore acts as a platform connecting buyers and vendors. To the fullest extent permitted by law, Lukmoore is not liable for indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "9. Termination",
    body: "We may suspend or terminate your access to Lukmoore at any time for violation of these terms or for any other reason, with or without notice.",
  },
  {
    title: "10. Governing Law",
    body: "These terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.",
  },
  {
    title: "11. Changes to These Terms",
    body: "We may revise these Terms of Service from time to time. Continued use of Lukmoore after changes take effect constitutes acceptance of the revised terms.",
  },
  {
    title: "12. Contact Us",
    body: "Questions about these Terms of Service can be directed to legal@lukmoore.com.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Terms of Service" description="Last updated: January 1, 2025" />
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
