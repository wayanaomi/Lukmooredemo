import { categories } from "@/lib/data/categories";
import { vendors } from "@/lib/data/vendors";
import {
  createSeededRandom,
  seededFloat,
  seededInt,
  seededPick,
  stringToSeed,
} from "@/lib/utils/seeded-random";
import { picsumUrl } from "@/lib/utils/format";
import type { Product, ProductReview, ProductVariant } from "@/types/marketplace";
import slugify from "slugify";

interface ProductTemplate {
  title: string;
  categorySlug: string;
  vendorSlug: string;
  basePrice: number;
  tags: string[];
  hasVariants?: boolean;
  variantAttribute?: string;
  variantOptions?: string[];
}

const templates: ProductTemplate[] = [
  { title: "Wireless Noise-Cancelling Headphones", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 189, tags: ["audio", "wireless", "bestseller"], hasVariants: true, variantAttribute: "Color", variantOptions: ["Midnight Black", "Pearl White", "Sunset Red"] },
  { title: "Smart Home Speaker with Voice Assistant", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 129, tags: ["smart-home", "audio"] },
  { title: "4K Ultra HD Streaming Box", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 79, tags: ["streaming", "tv"] },
  { title: "Fast-Charging Power Bank 20,000mAh", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 45, tags: ["charging", "travel"] },
  { title: "Mechanical Gaming Keyboard RGB", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 99, tags: ["gaming", "keyboard"], hasVariants: true, variantAttribute: "Switch Type", variantOptions: ["Red Switch", "Blue Switch", "Brown Switch"] },
  { title: "Ultra-Slim Laptop Stand", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 34, tags: ["accessories", "office"] },
  { title: "Smartwatch with Health Tracking", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 159, tags: ["wearable", "fitness"], hasVariants: true, variantAttribute: "Band Color", variantOptions: ["Black", "Rose Gold", "Ocean Blue"] },
  { title: "Portable Bluetooth Projector", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 219, tags: ["home-theater"] },
  { title: "USB-C Hub 9-in-1 Adapter", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 39, tags: ["accessories"] },
  { title: "Noise-Isolating Studio Earbuds", categorySlug: "electronics", vendorSlug: "auralux-electronics", basePrice: 69, tags: ["audio"] },

  { title: "Oversized Wool-Blend Coat", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 149, tags: ["outerwear", "winter"], hasVariants: true, variantAttribute: "Size", variantOptions: ["S", "M", "L", "XL"] },
  { title: "Tailored Linen Blazer", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 119, tags: ["formal"], hasVariants: true, variantAttribute: "Size", variantOptions: ["S", "M", "L", "XL"] },
  { title: "High-Waist Wide Leg Trousers", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 74, tags: ["bottoms"], hasVariants: true, variantAttribute: "Size", variantOptions: ["S", "M", "L", "XL"] },
  { title: "Silk Wrap Midi Dress", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 134, tags: ["dresses", "bestseller"], hasVariants: true, variantAttribute: "Size", variantOptions: ["XS", "S", "M", "L"] },
  { title: "Minimalist Leather Tote Bag", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 165, tags: ["bags"] },
  { title: "Ribbed Knit Turtleneck Sweater", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 68, tags: ["knitwear"], hasVariants: true, variantAttribute: "Size", variantOptions: ["S", "M", "L", "XL"] },
  { title: "Classic Straight-Leg Denim Jeans", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 82, tags: ["denim"], hasVariants: true, variantAttribute: "Size", variantOptions: ["26", "28", "30", "32", "34"] },
  { title: "Everyday Cotton Crewneck Tee 3-Pack", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 38, tags: ["basics"] },
  { title: "Statement Pearl Drop Earrings", categorySlug: "jewelry-accessories", vendorSlug: "velora-fashion-house", basePrice: 44, tags: ["jewelry"] },
  { title: "14K Gold-Plated Layered Necklace", categorySlug: "jewelry-accessories", vendorSlug: "velora-fashion-house", basePrice: 56, tags: ["jewelry", "bestseller"] },
  { title: "Structured Wide-Brim Sun Hat", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 41, tags: ["accessories"] },
  { title: "Chunky Sole Leather Sneakers", categorySlug: "fashion", vendorSlug: "velora-fashion-house", basePrice: 98, tags: ["footwear"], hasVariants: true, variantAttribute: "Size", variantOptions: ["38", "39", "40", "41", "42", "43"] },

  { title: "Vitamin C Brightening Serum", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 32, tags: ["skincare", "bestseller"] },
  { title: "Shea & Baobab Body Butter", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 24, tags: ["skincare"] },
  { title: "Rosemary Mint Scalp Treatment Oil", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 21, tags: ["haircare"] },
  { title: "Clay Detox Face Mask", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 19, tags: ["skincare"] },
  { title: "Hydrating Hyaluronic Acid Toner", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 22, tags: ["skincare"] },
  { title: "Cocoa & Coffee Body Scrub", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 18, tags: ["bodycare"] },
  { title: "Botanical Repair Hair Mask", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 27, tags: ["haircare"] },
  { title: "SPF 50 Mineral Sunscreen", categorySlug: "beauty-personal-care", vendorSlug: "glow-botanics", basePrice: 26, tags: ["skincare", "bestseller"] },

  { title: "Handwoven Jute Area Rug", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 89, tags: ["decor"], hasVariants: true, variantAttribute: "Size", variantOptions: ["120x180cm", "160x230cm", "200x290cm"] },
  { title: "Linen Duvet Cover Set", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 76, tags: ["bedding"], hasVariants: true, variantAttribute: "Size", variantOptions: ["Queen", "King"] },
  { title: "Ceramic Vase Trio Set", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 42, tags: ["decor"] },
  { title: "Scented Soy Candle Collection", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 29, tags: ["decor", "bestseller"] },
  { title: "Rattan Accent Armchair", categorySlug: "furniture", vendorSlug: "haven-home-living", basePrice: 245, tags: ["furniture"] },
  { title: "Oak Wood Coffee Table", categorySlug: "furniture", vendorSlug: "haven-home-living", basePrice: 320, tags: ["furniture"] },
  { title: "Velvet Throw Pillow Set of 2", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 34, tags: ["decor"] },
  { title: "Modular Bookshelf Unit", categorySlug: "furniture", vendorSlug: "haven-home-living", basePrice: 189, tags: ["furniture"] },
  { title: "Stoneware Dinnerware Set 16-Piece", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 112, tags: ["kitchen"] },
  { title: "Blackout Curtain Panels Pair", categorySlug: "home-living", vendorSlug: "haven-home-living", basePrice: 48, tags: ["decor"] },

  { title: "Performance Running Shoes", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 118, tags: ["footwear", "bestseller"], hasVariants: true, variantAttribute: "Size", variantOptions: ["40", "41", "42", "43", "44", "45"] },
  { title: "Adjustable Dumbbell Set", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 165, tags: ["fitness"] },
  { title: "Moisture-Wicking Training Tee", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 28, tags: ["apparel"], hasVariants: true, variantAttribute: "Size", variantOptions: ["S", "M", "L", "XL"] },
  { title: "4-Person Camping Tent", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 149, tags: ["outdoor"] },
  { title: "Foldable Yoga Mat with Strap", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 32, tags: ["fitness"] },
  { title: "Insulated Steel Water Bottle 1L", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 21, tags: ["accessories", "bestseller"] },
  { title: "Resistance Bands Set of 5", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 19, tags: ["fitness"] },
  { title: "Trail Running Backpack 20L", categorySlug: "sports-outdoors", vendorSlug: "prime-stride-sports", basePrice: 87, tags: ["outdoor"] },

  { title: "Wooden Shape-Sorting Puzzle", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 24, tags: ["educational"] },
  { title: "STEM Robotics Building Kit", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 58, tags: ["educational", "bestseller"] },
  { title: "Plush Safari Animal Set", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 32, tags: ["plush"] },
  { title: "Magnetic Alphabet Board", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 27, tags: ["educational"] },
  { title: "Wooden Balance Bike", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 74, tags: ["outdoor"] },
  { title: "1000-Piece World Map Puzzle", categorySlug: "toys-kids", vendorSlug: "little-atlas-toys", basePrice: 22, tags: ["puzzle"] },

  { title: "Hardcover Bound Travel Journal", categorySlug: "books-stationery", vendorSlug: "pagebound-books", basePrice: 18, tags: ["stationery", "bestseller"] },
  { title: "Contemporary African Fiction Box Set", categorySlug: "books-stationery", vendorSlug: "pagebound-books", basePrice: 45, tags: ["books"] },
  { title: "Fountain Pen Starter Set", categorySlug: "books-stationery", vendorSlug: "pagebound-books", basePrice: 29, tags: ["stationery"] },
  { title: "Minimalist Desk Planner", categorySlug: "books-stationery", vendorSlug: "pagebound-books", basePrice: 16, tags: ["stationery"] },
  { title: "Illustrated Cookbook: West African Kitchen", categorySlug: "books-stationery", vendorSlug: "pagebound-books", basePrice: 33, tags: ["books"] },

  { title: "All-Weather Car Floor Mats Set", categorySlug: "automotive", vendorSlug: "torqueline-auto", basePrice: 54, tags: ["accessories"] },
  { title: "LED Headlight Conversion Kit", categorySlug: "automotive", vendorSlug: "torqueline-auto", basePrice: 68, tags: ["parts", "bestseller"] },
  { title: "Portable Jump Starter Power Pack", categorySlug: "automotive", vendorSlug: "torqueline-auto", basePrice: 89, tags: ["accessories"] },
  { title: "Microfiber Car Detailing Kit", categorySlug: "automotive", vendorSlug: "torqueline-auto", basePrice: 37, tags: ["accessories"] },
  { title: "Universal Phone Mount Dashboard", categorySlug: "automotive", vendorSlug: "torqueline-auto", basePrice: 15, tags: ["accessories"] },
];

const reviewComments = [
  "Exceeded my expectations — the quality feels premium and shipping was fast.",
  "Exactly as described. Would order again from this vendor without hesitation.",
  "Great value for the price. Packaging was thoughtful and secure.",
  "Good product overall, though delivery took a couple of days longer than expected.",
  "This is my second purchase from this store — consistent quality every time.",
  "Really impressed with the attention to detail. Customer support was responsive too.",
  "Solid purchase. Matches the photos and description accurately.",
  "Works perfectly and looks even better in person.",
  "A bit smaller than I imagined, but the quality makes up for it.",
  "Fast shipping, well packaged, and the vendor followed up to make sure I was satisfied.",
];

const reviewerNames = [
  "Amara Chukwu", "David Mensah", "Fatima Bello", "Kwame Asante", "Grace Wanjiru",
  "Tunde Adeyemi", "Naledi Dlamini", "Samuel Okoye", "Aisha Mohammed", "Chidi Eze",
  "Zanele Khumalo", "Emeka Obi", "Wanjiku Kamau", "Ola Adekunle", "Rahma Yusuf",
];

function buildVariants(
  random: () => number,
  basePrice: number,
  attribute: string,
  options: string[],
  productId: string
): ProductVariant[] {
  return options.map((option, index) => ({
    id: `${productId}-v${index}`,
    name: option,
    sku: `${productId.toUpperCase()}-${option.replace(/\s+/g, "").slice(0, 4).toUpperCase()}`,
    price: basePrice + (index === 0 ? 0 : seededInt(random, -5, 12)),
    stock: seededInt(random, 0, 60),
    attributes: { [attribute]: option },
  }));
}

function buildReviews(random: () => number, productId: string, count: number): ProductReview[] {
  return Array.from({ length: count }, (_, index) => {
    const rating = seededPick(random, [5, 5, 5, 4, 4, 4, 3]);
    return {
      id: `${productId}-review-${index}`,
      productId,
      customerName: seededPick(random, reviewerNames),
      rating,
      title: rating >= 5 ? "Outstanding purchase" : rating >= 4 ? "Very satisfied" : "Decent, met expectations",
      comment: seededPick(random, reviewComments),
      createdAt: new Date(Date.now() - seededInt(random, 1, 260) * 86400000).toISOString(),
      verifiedPurchase: random() > 0.15,
      helpfulCount: seededInt(random, 0, 48),
    };
  });
}

function generateProducts(): Product[] {
  return templates.map((template, index) => {
    const id = `prod-${(index + 1).toString().padStart(3, "0")}`;
    const slug = slugify(template.title, { lower: true, strict: true });
    const random = createSeededRandom(stringToSeed(id));
    const vendor = vendors.find((v) => v.slug === template.vendorSlug)!;
    const category = categories.find((c) => c.slug === template.categorySlug)!;

    const discountRoll = random();
    const hasDiscount = discountRoll > 0.55;
    const compareAtPrice = hasDiscount
      ? Math.round(template.basePrice * seededFloat(random, 1.15, 1.6, 2))
      : undefined;

    const isFlashSale = discountRoll > 0.85;
    const rating = seededFloat(random, 3.9, 5.0, 1);
    const reviewCount = seededInt(random, 12, 640);

    const images = [
      picsumUrl(`${id}-a`, 900, 900),
      picsumUrl(`${id}-b`, 900, 900),
      picsumUrl(`${id}-c`, 900, 900),
      picsumUrl(`${id}-d`, 900, 900),
    ];

    const variants =
      template.hasVariants && template.variantAttribute && template.variantOptions
        ? buildVariants(random, template.basePrice, template.variantAttribute, template.variantOptions, id)
        : [];

    return {
      id,
      slug,
      title: template.title,
      description: `${template.title} from ${vendor.name}. Thoughtfully designed and quality-checked before dispatch, this ${category.name.toLowerCase()} favorite ships with Lukmoore's buyer protection guarantee, secure packaging, and real-time order tracking. Backed by ${vendor.name}'s ${vendor.responseRate}% response rate and a track record of ${vendor.reviewCount.toLocaleString()} verified reviews across their storefront.`,
      shortDescription: `Premium ${category.name.toLowerCase()} pick from ${vendor.name}, loved by ${reviewCount.toLocaleString()}+ customers.`,
      images,
      price: template.basePrice,
      compareAtPrice,
      currency: "NGN",
      rating,
      reviewCount,
      soldCount: seededInt(random, 30, 4200),
      stock: seededInt(random, 0, 240),
      categoryId: category.id,
      categorySlug: category.slug,
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorSlug: vendor.slug,
      tags: template.tags,
      variants,
      isFlashSale,
      flashSaleEndsAt: isFlashSale
        ? new Date(Date.now() + seededInt(random, 3, 72) * 3600000).toISOString()
        : undefined,
      isNew: random() > 0.8,
      isFeatured: random() > 0.75,
      freeShipping: random() > 0.4,
      createdAt: new Date(Date.now() - seededInt(random, 1, 400) * 86400000).toISOString(),
    };
  });
}

export const products: Product[] = generateProducts();

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductReviews(productId: string): ProductReview[] {
  const random = createSeededRandom(stringToSeed(productId));
  const product = products.find((p) => p.id === productId);
  return buildReviews(random, productId, product ? Math.min(10, Math.max(3, Math.floor(product.reviewCount / 40))) : 5);
}

export function getFeaturedProducts(limit = 8) {
  return products.filter((product) => product.isFeatured).slice(0, limit);
}

export function getFlashSaleProducts() {
  return products.filter((product) => product.isFlashSale);
}

export function getNewArrivals(limit = 8) {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getBestSellers(limit = 8) {
  return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsByVendor(vendorSlug: string) {
  return products.filter((product) => product.vendorSlug === vendorSlug);
}

export function getRelatedProducts(product: Product, limit = 6) {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalized)) ||
      product.vendorName.toLowerCase().includes(normalized) ||
      product.categorySlug.includes(normalized)
  );
}
