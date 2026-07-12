"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/marketplace/product-card";
import { SortSelect } from "@/components/marketplace/sort-select";
import { EmptyState } from "@/components/shared/empty-state";
import { products } from "@/lib/data/products";
import { filterAndSortProducts } from "@/lib/utils/product-filters";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? undefined;
  const results = filterAndSortProducts(products, { q: query, sort });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{results.length} products found</p>
        </div>
        <SortSelect />
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No results found"
            description="Try different keywords or browse our categories instead."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
