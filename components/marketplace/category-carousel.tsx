import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import type { Category } from "@/types/marketplace";

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  return (
    <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
      {categories.map((category) => {
        const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[category.icon] ?? LucideIcons.Package;
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group flex w-32 shrink-0 flex-col items-center gap-3 rounded-2xl border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-brand-md sm:w-40"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted sm:h-20 sm:w-20">
              <Image src={category.image} alt={category.name} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="line-clamp-2 text-sm font-medium">{category.name}</p>
              <p className="text-xs text-muted-foreground">{category.productCount} items</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
