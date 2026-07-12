export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  publishedAt: string;
  coverImage: string;
  readTimeMinutes: number;
};

const authors = ["Ifeoma Adeyemi", "Marcus Otieno", "Sandra Nkosi", "Daniel Owusu"];

export const blogCategories = [
  "Marketplace News",
  "Vendor Tips",
  "Shopping Guides",
  "Product Spotlights",
] as const;

const posts: Omit<BlogPost, "coverImage">[] = [
  {
    slug: "how-to-choose-a-reliable-vendor",
    title: "How to Choose a Reliable Vendor on Lukmoore",
    excerpt: "Ratings, reviews, and response times — here's what to look for before you buy.",
    category: "Shopping Guides",
    author: authors[0],
    publishedAt: "2025-01-14",
    readTimeMinutes: 5,
    content: [
      "With thousands of vendors on Lukmoore, knowing how to spot a reliable seller can save you time and money.",
      "Start with the store rating and review count — a 4.5+ rating with hundreds of reviews is a strong signal of consistency.",
      "Check response time and fulfillment rate on the vendor's store page. Vendors who respond within a few hours and ship quickly tend to deliver better experiences.",
      "Finally, look for the 'Verified Vendor' badge, which means the seller has completed Lukmoore's KYC and business verification process.",
    ],
  },
  {
    slug: "vendor-onboarding-checklist",
    title: "The Ultimate Vendor Onboarding Checklist",
    excerpt: "Everything you need to launch a successful store on Lukmoore in under a week.",
    category: "Vendor Tips",
    author: authors[1],
    publishedAt: "2025-02-02",
    readTimeMinutes: 7,
    content: [
      "Launching a store on Lukmoore is fast, but a little preparation goes a long way.",
      "1. Gather your business documents for KYC verification — this typically takes under 48 hours to review.",
      "2. Prepare high-quality product photography. Listings with 4+ images convert 2x better than single-image listings.",
      "3. Write clear, benefit-driven product descriptions and set competitive, transparent pricing.",
      "4. Set up your shipping zones and processing times so customers know exactly what to expect.",
      "5. Enable notifications so you never miss a new order or customer message.",
    ],
  },
  {
    slug: "flash-sales-playbook-for-shoppers",
    title: "The Flash Sales Playbook: Never Miss a Deal Again",
    excerpt: "Insider tips on timing, stock levels, and stacking coupons during Lukmoore flash sales.",
    category: "Shopping Guides",
    author: authors[2],
    publishedAt: "2025-02-20",
    readTimeMinutes: 4,
    content: [
      "Flash sales on Lukmoore move fast — some categories sell out within minutes of launch.",
      "Turn on push notifications from the Flash Sales page so you're alerted the moment a new sale goes live.",
      "Add items to your wishlist ahead of time so checkout takes seconds, not minutes, once the sale starts.",
      "Many flash sale items can be combined with active coupon codes for even deeper discounts — check the Offers page first.",
    ],
  },
  {
    slug: "2025-marketplace-growth-report",
    title: "Lukmoore's 2025 Marketplace Growth Report",
    excerpt: "A look back at our biggest year yet — new vendors, categories, and customer milestones.",
    category: "Marketplace News",
    author: authors[3],
    publishedAt: "2025-03-10",
    readTimeMinutes: 6,
    content: [
      "2025 has been a landmark year for Lukmoore. We crossed 4,200 active vendors and 65,000 live product listings.",
      "Electronics, Fashion, and Home & Living remained our top three categories by order volume.",
      "We also expanded payment coverage with deeper Flutterwave and Paystack integration, unlocking mobile money checkout in six new countries.",
      "Looking ahead, we're investing heavily in vendor analytics tooling and same-day delivery partnerships.",
    ],
  },
  {
    slug: "spotlight-artisan-leather-goods",
    title: "Vendor Spotlight: Artisan Leather Goods Co.",
    excerpt: "How a two-person leather workshop grew into one of our top-rated stores.",
    category: "Product Spotlights",
    author: authors[0],
    publishedAt: "2025-03-25",
    readTimeMinutes: 5,
    content: [
      "What started as a small family workshop is now one of Lukmoore's most beloved fashion accessory stores.",
      "Artisan Leather Goods Co. focuses on handcrafted, full-grain leather bags and wallets, each piece taking up to six hours to complete.",
      "Their secret? Obsessive attention to product photography and consistently fast response times to customer questions.",
      "Today they ship to over 30 countries and maintain a 4.9-star rating across more than 3,000 reviews.",
    ],
  },
];

export const blogPosts: BlogPost[] = posts.map((post, index) => ({
  ...post,
  coverImage: `https://picsum.photos/seed/lukmoore-blog-${index}/1200/700`,
}));

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
