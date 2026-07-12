import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { ProductFilters } from "@/components/marketplace/product-filters";
import { ProductCard } from "@/components/marketplace/product-card";
import { SortSelect } from "@/components/marketplace/sort-select";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { products } from "@/lib/data/products";
import { filterAndSortProducts, type ProductQueryParams } from "@/lib/utils/product-filters";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse thousands of products from verified vendors across every category on Lukmoore.",
};

const PAGE_SIZE = 12;

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams & { page?: string }>;
}) {
  const params = await searchParams;
  const filtered = filterAndSortProducts(products, params);
  const page = Math.max(1, Number(params.page ?? 1));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function pageHref(target: number) {
    const next = new URLSearchParams(params as Record<string, string>);
    next.set("page", String(target));
    return `?${next.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Marketplace" }]} />
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <SortSelect />
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <ProductFilters />
        <div className="flex-1">
          {paginated.length === 0 ? (
            <EmptyState
              title="No products match your filters"
              description="Try adjusting your filters or search for something else."
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={page > 1 ? pageHref(page - 1) : "#"} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink href={pageHref(p)} isActive={p === page}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={page < totalPages ? pageHref(page + 1) : "#"} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
