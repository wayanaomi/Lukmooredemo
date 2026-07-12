import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { ProductFilters } from "@/components/marketplace/product-filters";
import { ProductCard } from "@/components/marketplace/product-card";
import { SortSelect } from "@/components/marketplace/sort-select";
import { EmptyState } from "@/components/shared/empty-state";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { filterAndSortProducts, type ProductQueryParams } from "@/lib/utils/product-filters";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category?.name ?? "Category",
    description: category
      ? `Shop ${category.name} from verified Lukmoore vendors.`
      : undefined,
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<ProductQueryParams>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const query = await searchParams;
  const categoryProducts = filterAndSortProducts(getProductsByCategory(slug), query);

  return (
    <div>
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <Image src={category.image} alt={category.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">{category.name}</h1>
            <p className="text-sm text-muted-foreground">{category.productCount} products available</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />
        <div className="mt-4 flex justify-end">
          <SortSelect />
        </div>
        <div className="mt-6 flex gap-8">
          <ProductFilters />
          <div className="flex-1">
            {categoryProducts.length === 0 ? (
              <EmptyState title="No products found" description="Try a different filter combination." />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
