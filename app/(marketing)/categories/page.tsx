import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore every product category available on Lukmoore's marketplace.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Explore" title="All Categories" description="Find the right department for whatever you're shopping for." />
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon =
            (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[category.icon] ??
            LucideIcons.Package;
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-brand-md"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                  <Icon className="h-4.5 w-4.5 text-brand-red" />
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">{category.productCount} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
